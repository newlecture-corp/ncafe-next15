import React from "react";

const RowDetails: React.FC = () => {
  return (
    <tr>
      <td colSpan={5}>
        <section>
          <h1 className="d:none">상세정보</h1>
          <div>상세정보 없음</div>
        </section>
      </td>
    </tr>
  );
};

export default RowDetails;
