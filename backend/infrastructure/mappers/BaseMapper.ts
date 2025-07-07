/**
 * 데이터베이스 스네이크 케이스와 도메인 객체 카멜 케이스 간의 기본 매핑 유틸리티
 */
export class BaseMapper {
	/**
	 * 스네이크 케이스를 카멜 케이스로 변환
	 */
	static toCamelCase(str: string): string {
		return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
	}

	/**
	 * 카멜 케이스를 스네이크 케이스로 변환
	 */
	static toSnakeCase(str: string): string {
		return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
	}

	/**
	 * 객체의 모든 키를 스네이크 케이스에서 카멜 케이스로 변환
	 */
	static mapToCamelCase<T extends Record<string, unknown>>(
		obj: Record<string, unknown>
	): T {
		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(obj)) {
			const camelKey = this.toCamelCase(key);
			result[camelKey] = value;
		}

		return result as T;
	}

	/**
	 * 객체의 모든 키를 카멜 케이스에서 스네이크 케이스로 변환
	 */
	static mapToSnakeCase<T extends Record<string, unknown>>(
		obj: Record<string, unknown>
	): T {
		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(obj)) {
			const snakeKey = this.toSnakeCase(key);
			result[snakeKey] = value;
		}

		return result as T;
	}

	/**
	 * 배열의 모든 객체를 스네이크 케이스에서 카멜 케이스로 변환
	 */
	static mapArrayToCamelCase<T extends Record<string, unknown>>(
		arr: Record<string, unknown>[]
	): T[] {
		return arr.map((item) => this.mapToCamelCase<T>(item));
	}

	/**
	 * 배열의 모든 객체를 카멜 케이스에서 스네이크 케이스로 변환
	 */
	static mapArrayToSnakeCase<T extends Record<string, unknown>>(
		arr: Record<string, unknown>[]
	): T[] {
		return arr.map((item) => this.mapToSnakeCase<T>(item));
	}
}
