import { PrismaClient } from "@prisma/client"; // PrismaClient를 @prisma/client에서 import

const prisma = new PrismaClient({
//   log: [{ emit: "event", level: "query" }, "info", "warn", "error"], // 쿼리, 정보, 경고, 에러 로그를 출력하도록 설정
});

// prisma.$on("query", (e) => {
//   console.log("Query:", e.query); // 실행된 쿼리문 출력
//   console.log("Params:", e.params); // 쿼리에 전달된 파라미터 출력
//   console.log("Duration:", e.duration, "ms"); // 쿼리 실행 시간(ms) 출력
// });

export default prisma; // prisma 인스턴스를 기본 내보내기로 export 

/*
Prisma log 옵션 설명

- level에 들어갈 수 있는 값:
  - "query": 실행되는 SQL 쿼리 로그
  - "info": 정보성 메시지
  - "warn": 경고 메시지
  - "error": 에러 메시지

- emit에 들어갈 수 있는 값:
  - "stdout": 콘솔에 바로 출력
  - "event": 이벤트로 받아서 직접 핸들링

예시:
const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" }, // 쿼리 로그를 이벤트로 받음
    { emit: "stdout", level: "info" }, // info 로그를 콘솔에 바로 출력
    "warn", // warn 로그를 콘솔에 바로 출력 (emit 생략 시 stdout)
    "error" // error 로그를 콘솔에 바로 출력
  ],
});
*/ 