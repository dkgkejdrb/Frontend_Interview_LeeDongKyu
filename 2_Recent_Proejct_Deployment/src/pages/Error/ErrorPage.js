import { StopOutlined } from '@ant-design/icons';
const ErrorPage = () => {

    return(
        <div
        style={{
          width: 980,
          height: 500,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 100 }}>
          <StopOutlined />
        </div>
        <div style={{ fontSize: 50 }}>OOPS!</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: 50, fontSize: 30 }}>
            1. 등록된 ID를 확인할 수 없습니다.
          </div>
          <div style={{ fontSize: 30 }}>
            2. 등록된 클래스를 확인할 수 없습니다.
          </div>
    
          <div style={{ marginTop: 25, fontSize: 20 }}>
            새로고침(F5)을 후에도 문제가 있다면, 관리자에게 문의해주세요.
          </div>
        </div>
      </div>
    );
}

export default ErrorPage