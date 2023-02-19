import React from "react";
import "./LoadingPage.scss";
export function LoadingPage() {
  return (
    <>
      <div class="loadingPage">
        <button class="closeLoadingPage" disabled="disabled">
          加载页面
        </button>
      </div>
    </>
  );
}
