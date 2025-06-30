import React from 'react';
import '../styles/DashboardPage.css';

function DashboardChartUI() {
  const showTreatment = true;

  return (
    <div
      style={{
        width: '100%',
        padding: '30px',
        fontFamily: 'sans-serif',
        maxWidth: 'none',
        minHeight: '1000px',
      }}
    >
      {/* ✅ 상단 아이콘 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
        <span title="녹음 중지" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => alert('녹음 중지!')}>🛑</span>
        <span title="수정 모드" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => alert('수정 모드!')}>✏️</span>
        <span title="인쇄" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => window.print()}>🖨️</span>
      </div>

      {showTreatment && (
        <>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>녹취 요약 결과</h2>
          <table className="dashboard-table expanded-table" style={{ width: '100%', fontSize: '16px' }}>
            <thead>
              <tr>
                <th>치식</th>
                <th>치료</th>
                <th>치료기간</th>
                <th>건강보험유무</th>
                <th>비용</th>
                <th>주의사항</th>
                <th>치료순서</th>
                <th>동의</th>
                <th>비동의사유</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#26</td>
                <td>Endo</td>
                <td>시간: 20분<br />기간: 1달 내 3번 방문</td>
                <td>급여</td>
                <td>1~2만원</td>
                <td>
                  1. 자극적인 음식 주의<br />
                  2. 반대편으로 식사
                </td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>#26</td>
                <td>Crown</td>
                <td>시간: 1시간<br />기간: 1주일 내 2번 방문</td>
                <td>급여 (단, 나이 및 재료에 따라 상이)</td>
                <td>
                  1. 임시치아: 0원<br />
                  2. 금: 80~85만원<br />
                  3. 지르코: 0원
                </td>
                <td>임시치아 빠지지 않도록 치실 사용 주의</td>
                <td>2</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>#11</td>
                <td>임플란트 발치</td>
                <td>시간: 40분<br />기간: 1번</td>
                <td>부분급여</td>
                <td>
                  1. 잇몸치료: 2만원<br />
                  2. 발치: 1만원<br />
                  3. 임시치아: 0원
                </td>
                <td>
                  1. 2시간동안 거즈물기<br />
                  2. 매끼 흘린 후 식사<br />
                  3. flipper 사용법
                </td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>#11</td>
                <td>Implant</td>
                <td>시간: 1시간 30분<br />기간: 3개월 내 3번 방문</td>
                <td>비급여 (단, 나이 및 재료에 따라 상이)</td>
                <td>
                  1. fixture: 0원<br />
                  2. 오스템: 180만원<br />
                  3. 보철물: 1만원
                </td>
                <td>상처부위 건드리지 않기</td>
                <td>2</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DashboardChartUI;
