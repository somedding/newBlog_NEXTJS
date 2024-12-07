import { FaHardHat, FaCog } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="shadow-xl card bg-base-100">
        <div className="text-center card-body">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <FaHardHat className="text-4xl text-warning animate-bounce" />
              <h1 className="text-3xl font-bold text-base-content">페이지 제작 중</h1>
              <FaCog className="text-4xl text-warning animate-spin" />
            </div>
            
            <p className="text-xl text-base-content/70">
              더 나은 모습으로 찾아뵙겠습니다! 😊
            </p>
            
            <div className="p-4 mt-4 rounded-lg bg-warning/10">
              <p className="text-warning">
                현재 자기소개 페이지를 열심히 준비하고 있습니다.
                <br />
                조금만 기다려주세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
