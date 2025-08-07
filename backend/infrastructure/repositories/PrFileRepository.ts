import {
	FileRepository,
	FileMetadata,
	FileSaveOptions,
} from "../../domain/repositories/FileRepository";
import { promises as fs } from "fs";
import path from "path";

export class PrFileRepository implements FileRepository {
	private basePath: string;

	constructor(basePath: string = "public/image") {
		this.basePath = basePath;
	}

	async save(
		filePath: string,
		fileName: string,
		file: Buffer | ArrayBuffer | Blob,
		options?: FileSaveOptions
	): Promise<string> {
		const onDuplicate = options?.onDuplicate ?? "serial";
		let finalFileName = fileName;

		// 중복 파일 처리
		if (onDuplicate === "serial") {
			const baseName = fileName.replace(/\.[^/.]+$/, "");
			const ext = fileName.split(".").pop();
			let idx = 1;
			while (await this.exists(filePath, finalFileName)) {
				finalFileName = `${baseName}(${idx}).${ext}`;
				idx++;
			}
		} else if (onDuplicate === "error") {
			if (await this.exists(filePath, finalFileName)) {
				throw new Error("동일한 파일명이 이미 존재합니다.");
			}
		}

		// 디렉토리 생성
		const fullDirPath = path.join(this.basePath, filePath);
		await fs.mkdir(fullDirPath, { recursive: true });

		// 파일 저장
		const fullFilePath = path.join(fullDirPath, finalFileName);
		let buffer: Buffer;
		if (file instanceof Buffer) {
			buffer = file;
		} else if (file instanceof ArrayBuffer) {
			buffer = Buffer.from(file);
		} else if (file instanceof Blob) {
			// Blob을 ArrayBuffer로 변환 후 Buffer로 변환
			const arrayBuffer = await file.arrayBuffer();
			buffer = Buffer.from(arrayBuffer);
		} else {
			throw new Error("지원하지 않는 파일 타입입니다.");
		}
		await fs.writeFile(fullFilePath, buffer);

		// 상대 경로 반환 (웹에서 접근 가능한 경로)
		return `/image/${filePath}/${finalFileName}`;
	}

	async delete(filePath: string, fileName: string): Promise<void> {
		const fullFilePath = path.join(this.basePath, filePath, fileName);
		try {
			await fs.unlink(fullFilePath);
		} catch (error) {
			throw new Error(`파일 삭제 실패: ${error}`);
		}
	}

	async exists(filePath: string, fileName: string): Promise<boolean> {
		const fullFilePath = path.join(this.basePath, filePath, fileName);
		try {
			await fs.access(fullFilePath);
			return true;
		} catch {
			return false;
		}
	}

	async findAll(filePath: string): Promise<string[]> {
		const fullDirPath = path.join(this.basePath, filePath);
		try {
			const files = await fs.readdir(fullDirPath);
			return files.filter((file) => {
				const fullFilePath = path.join(fullDirPath, file);
				return fs.stat(fullFilePath).then((stat) => stat.isFile());
			});
		} catch {
			return [];
		}
	}

	async getMetadata(filePath: string, fileName: string): Promise<FileMetadata> {
		const fullFilePath = path.join(this.basePath, filePath, fileName);
		try {
			const stats = await fs.stat(fullFilePath);
			return {
				size: stats.size,
				contentType: this.getContentType(fileName),
				lastModified: stats.mtime,
				etag: stats.mtime.getTime().toString(),
			};
		} catch {
			throw new Error("파일을 찾을 수 없습니다.");
		}
	}

	private getContentType(fileName: string): string {
		const ext = path.extname(fileName).toLowerCase();
		const mimeTypes: Record<string, string> = {
			".jpg": "image/jpeg",
			".jpeg": "image/jpeg",
			".png": "image/png",
			".gif": "image/gif",
			".webp": "image/webp",
			".svg": "image/svg+xml",
		};
		return mimeTypes[ext] || "application/octet-stream";
	}
}
