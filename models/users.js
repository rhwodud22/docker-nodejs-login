// 이전에 MariaDB에 있는 테이블과 연결
// 시퀄라이즈에 User_info모델 생성 및 연결
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      /* 첫번째 인자: 테이블 이름 */
      // 'user_info', 
      'user', 
  
      /* 두번째 인자: 컬럼 모델 */
      {
      // 시퀄라이즈는 기본적으로 id를 기본키로 연결하므로 id 컬럼은 적을 필요가 없음
      user_id: {
        type: DataTypes.STRING(20), // VARCHAR -> STRING
        allowNull: false, 
      },
      user_pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, 
  
    /* 세번째 인자: 테이블 옵션 */
    {
      timestamps: false, // true 시 시퀄라이즈는 자동으로 createdAt과 updateAt 컬럼 추가
    });
  };