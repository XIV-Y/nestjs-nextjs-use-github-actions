import Link from "next/link";

export default function Home() {
  // Github Action Test
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4" data-testid="main-heading">
          Next.js + Vitestへようこそ
        </h1>
        <p className="text-xl mb-6">
          モダンなウェブアプリケーション開発とテスト自動化の素晴らしい組み合わせを体験しましょう。
        </p>
        <Link
          href="/about"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          詳細を見る
        </Link>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          data-testid="feature-card"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appルーターの特徴
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              レイアウト、ページ、コンポーネント間の明確な分離
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              サーバーコンポーネントによるパフォーマンス最適化
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              ルーティングの簡素化とネストされたルート
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vitestの利点
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Jest互換のAPIで学習曲線が緩やか
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Viteベースの超高速テスト実行
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              TypeScriptのサポートが充実
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
