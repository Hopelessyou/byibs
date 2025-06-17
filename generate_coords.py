import cv2
import sys
import json

# --- 사용법 ---
#
# 1. Python과 필요한 라이브러리가 설치되어 있는지 확인하세요.
#    (pip install opencv-python numpy)
#
# 2. 터미널에서 다음 명령어로 스크립트를 실행하세요:
#    python generate_coords.py public/images/civil/civil-flow.png
#    (경로는 원하는 이미지 파일로 변경 가능)
#
# 3. 이미지 창이 나타나면, 원하는 영역 위에서 마우스를 클릭하고 드래그하여 사각형을 그리세요.
#
# 4. 선택이 완료되면 키보드에서 ENTER 또는 SPACE 키를 누르세요.
#    (선택을 취소하고 다시 그리려면 'c' 키를 누르세요)
#
# 5. 스크립트가 계산된 'position' JSON 객체를 터미널에 출력합니다.
#
# 6. 같은 이미지에서 다른 영역을 계속 선택하려면 'y'를, 종료하려면 'n'을 입력하세요.
#
# 7. 언제든지 이미지 창에서 'q' 키를 누르면 즉시 종료됩니다.
#
# --------------------

def select_and_calculate_roi(image_path):
    """
    이미지를 로드하고, 사용자가 ROI(관심 영역)를 선택하게 한 후,
    위치 좌표를 백분율로 계산합니다.
    """
    try:
        img = cv2.imread(image_path)
        if img is None:
            print(f"오류: 이미지를 불러올 수 없습니다. 경로: {image_path}")
            return
        
        img_height, img_width, _ = img.shape
        print(f"이미지 크기: {img_width}px x {img_height}px")

        while True:
            window_name = "Area Selection (ENTER: Confirm, c: Cancel, q: Quit)"
            cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
            
            # selectROI는 사용자의 입력을 기다리는 블로킹 함수입니다.
            r = cv2.selectROI(window_name, img, fromCenter=False, showCrosshair=True)

            # 사용자가 선택을 완료하면 (x, y, w, h) 값이 반환됩니다.
            x_px, y_px, w_px, h_px = r

            # 사용자가 선택 없이 종료하면 (ESC 또는 'c'), 모든 값이 0이 됩니다.
            if w_px == 0 or h_px == 0:
                print("선택이 취소되었거나 창이 닫혔습니다.")
                break

            # 백분율 계산
            x_pct = (x_px / img_width) * 100
            y_pct = (y_px / img_height) * 100
            width_pct = (w_px / img_width) * 100
            height_pct = (h_px / img_height) * 100

            position_data = {
                "position": {
                    "x": round(x_pct, 2),
                    "y": round(y_pct, 2),
                    "width": round(width_pct, 2),
                    "height": round(height_pct, 2)
                }
            }

            # JSON 형식으로 예쁘게 출력
            print("\n--- 아래 JSON을 복사하여 사용하세요 ---")
            print(json.dumps(position_data, indent=2, ensure_ascii=False))
            print("-------------------------------------\n")
            
            another = input("같은 이미지에서 다른 영역을 선택하시겠습니까? (y/n): ").lower()
            if another != 'y':
                break
    
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")
    finally:
        cv2.destroyAllWindows()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python generate_coords.py <이미지_경로>")
        sys.exit(1)
    
    image_file = sys.argv[1]
    
    select_and_calculate_roi(image_file) 