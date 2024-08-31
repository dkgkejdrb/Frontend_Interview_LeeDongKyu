import { useEffect } from 'react';

const F5KeyAlertModal = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", showWarning);

    return () => {
      window.removeEventListener("beforeunload", showWarning);
    };
  }, []);

  function showWarning(e) {
    const confirmationMessage =
      "저장 혹은 업로드를 하지 않고 페이지를 벗어난 경우, 지금까지 작성한 내용이 사라집니다.";

    e.returnValue = confirmationMessage; // 기본 동작

    // Modal.confirm({
    window.alert({
      title: "작성중인 내용이 있습니다. 새로고침하시겠습니까?",
      content: confirmationMessage,
      onOk() {
        window.location.reload(); // 사용자가 확인을 누르면 페이지를 새로고침
      },
      onCancel() {
        // 사용자가 취소를 누르면 아무 것도 하지 않음
      },
    });
  }
}

export default F5KeyAlertModal;