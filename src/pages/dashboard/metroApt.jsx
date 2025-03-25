import { useState, useEffect, useRef } from "react";
import svgPanZoom from "svg-pan-zoom";

export function MetroApt() {
  const [svgContent, setSvgContent] = useState("");
  const [isSvgLoaded, setIsSvgLoaded] = useState(false); // SVG 로딩 여부 확인
  const svgContainerRef = useRef(null); // SVG 컨테이너 참조
  const panZoomInstance = useRef(null); // svgPanZoom 인스턴스

  const viewBoxSize = 1000; // SVG 원본 크기 및 초기 사이즈 통합
  const viewBox = useRef({ x: 0, y: 0, width: 2000, height: 2000 });

  const MIN_SCALE = 0.1;
  const MAX_SCALE = 3;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  // SVG 파일을 불러오기
  useEffect(() => {
    fetch("/img/Seoul_subway_linemap_ko.svg")
      .then((response) => response.text())
      .then((data) => {
        setSvgContent(data);
        setIsSvgLoaded(true); // SVG가 로드되었음을 표시
      })
      .catch((error) => console.error("SVG 불러오기 오류:", error));
  }, []);

  useEffect(() => {
    if (isSvgLoaded) {
      centerSVG();  // 🚀 SVG를 중앙 정렬
    }
  }, [isSvgLoaded]);

  useEffect(() => {
    if (isSvgLoaded && svgContainerRef.current) {
      // SVG가 로드된 후, 클릭 이벤트를 추가
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      if (svgElement) {
        svgElement.setAttribute("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`);
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
      }
      setSvgContent(new XMLSerializer().serializeToString(doc));

      if (svgContainerRef.current && !panZoomInstance.current) {
        const svg = svgContainerRef.current.querySelector("svg");
        if (svg) {
          panZoomInstance.current = svgPanZoom(svg, {
            zoomEnabled: false, // 기본 줌 해제 (직접 구현)
            panEnabled: false,  // 기본 팬 해제 (직접 구현)
            controlIconsEnabled: false,
            fit: false,
            center: false,
            minZoom: 1,
            maxZoom: 1,
            zoomScaleSensitivity: 0.2,
          });

          // ✅ SVG 초기 크기 축소
          // updateViewBox(200, 200, 800, 800);
          updateViewBox(1800, 1000, 2000, 2000);

          // ✅ 이벤트 리스너 추가
          svg.addEventListener("wheel", handleWheelZoom, { passive: false });
          svg.addEventListener("mousedown", handleMouseDown);
          svg.addEventListener("mousemove", handleMouseMove);
          svg.addEventListener("mouseup", handleMouseUp);
          svg.addEventListener("mouseleave", handleMouseUp);
        }
      }
    }
  }, [isSvgLoaded]); // SVG가 로드된 후 실행

  // 📌 `viewBox`를 업데이트하는 함수
  const updateViewBox = (x, y, width, height) => {
    const svg = svgContainerRef.current.querySelector("svg");
    if (!svg) return;

    // 🚀 크기를 더 작게 설정 (500x500)
    width = Math.max(width, 500);
    height = Math.max(height, 500);

    viewBox.current = { x, y, width, height };
    svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
  };

  const centerSVG = () => {
    const svg = svgContainerRef.current?.querySelector("svg");
    if (!svg) return;
  
    // ✅ 중앙 정렬을 위한 viewBox 설정 (X, Y 위치를 중앙으로 조정)
    // const x = viewBoxSize / 4;
    // const y = viewBoxSize / 4;
    const x = 800;
    const y = 500;
    const viewBoxWidth = 2000;
    const viewBoxHeight = 2000;
  
    updateViewBox(x, y, viewBoxWidth, viewBoxHeight);
  };

  // **SVG 클릭 이벤트를 감싸는 div에 적용하여 이벤트 위임**
  const handleSvgClick = (event) => {
    let target = event.target;
    
    while (target && target.tagName !== "text" && target.tagName !== "tspan") {
      target = target.parentElement;
    }

    if (target) {
      console.log("element.textContent == ", target.textContent);
      console.log(`역 클릭됨: ${target.textContent.trim()}`);
      alert(`역 클릭됨: ${target.textContent.trim()}`);
    }
  };

  // 📌 마우스 휠 확대/축소
  const handleWheelZoom = (event) => {
    event.preventDefault();
    const svg = svgContainerRef.current.querySelector("svg");
    if (!svg) return;

    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
    let newWidth = viewBox.current.width * zoomFactor;
    let newHeight = viewBox.current.height * zoomFactor;

    newWidth = Math.max(newWidth, 1000 * MIN_SCALE);
    newHeight = Math.max(newHeight, 1000 * MIN_SCALE);
    newWidth = Math.min(newWidth, 1000 * MAX_SCALE);
    newHeight = Math.min(newHeight, 1000 * MAX_SCALE);

    updateViewBox(viewBox.current.x, viewBox.current.y, newWidth, newHeight);
  };

  // 📌 마우스 드래그 이동 기능
  const handleMouseDown = (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const dx = (event.clientX - lastX) * (viewBox.current.width / 1000);
    const dy = (event.clientY - lastY) * (viewBox.current.height / 1000);

    updateViewBox(viewBox.current.x - dx, viewBox.current.y - dy, viewBox.current.width, viewBox.current.height);

    lastX = event.clientX;
    lastY = event.clientY;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  return (
    <>
      <div className="relative w-full">
        <div className="pt-16">
          <div
            className="mx-3 mb-6 lg:mx-4 border border-blue-gray-100 shadow-md rounded-md p-4 bg-white"
            style={{ width: "100%", minHeight: "500px" ,  overflow: "auto" }}
          >
            <div 
              className="max-h-[600px] overflow-hidden border border-gray-300 rounded-md overflow: auto"
              style={{ width: "100%", minHeight: "600px"}} // 추가된 스타일
              onClick={handleSvgClick} // SVG 클릭 이벤트 위임
              onWheel={handleWheelZoom} // 마우스 휠 이벤트 적용
              onMouseDown={handleMouseDown} // 클릭 시작 (드래그 준비)
              onMouseUp={handleMouseUp} // 클릭 해제 (드래그 종료)
              onMouseMove={handleMouseMove} // 드래그 중 (좌우 이동)
              onMouseLeave={handleMouseUp} // 화면 벗어나면 드래그 종료
            >
              <div 
                ref={svgContainerRef} // Ref를 이용하여 svgPanZoom 적용
                dangerouslySetInnerHTML={{ __html: svgContent }} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MetroApt;
