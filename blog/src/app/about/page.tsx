export default function AboutPage() {
    return (
      <div className="container mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">자기소개</h2>
            <p>안녕하세요! 저는 [이름]입니다...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">더 알아보기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }