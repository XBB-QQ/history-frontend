import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">📜</div>
        <h1 className="text-4xl font-black mb-4">史册无此页</h1>
        <p className="text-ink-500 mb-8">您访问的页面尚未载入史册</p>
        <Link to="/" className="btn-primary">返回史馆首页</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
