import React, { memo } from "react";
import styled from "styled-components";
const KakaoMainAdFitWrapper = styled.div`
  text-align: center;
`;

const KakaoMainAdFit = () => {
  return (
    <KakaoMainAdFitWrapper>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-PvTQLXsIaWRNWZ5k"
        data-ad-width="728"
        data-ad-height="90"
      ></ins>
      <script
        type="text/javascript"
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></script>
    </KakaoMainAdFitWrapper>
  );
};

export default memo(KakaoMainAdFit);
