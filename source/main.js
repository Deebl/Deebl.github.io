// 加载 React 和 ReactDOM CDN
(function() {
  function loadBanner() {
    // 确保 DOM 已加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBanner);
    } else {
      initBanner();
    }
  }
  
  // 检查是否已经加载了 React
  if (window.React && window.ReactDOM) {
    loadBanner();
    return;
  }

  // 加载 React CDN
  const reactScript = document.createElement('script');
  reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  reactScript.crossOrigin = 'anonymous';
  
  const reactDOMScript = document.createElement('script');
  reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
  reactDOMScript.crossOrigin = 'anonymous';
  
  reactScript.onload = () => {
    reactDOMScript.onload = loadBanner;
    document.head.appendChild(reactDOMScript);
  };
  
  document.head.appendChild(reactScript);
})();

function initBanner() {
  const { useState, useEffect } = React;
  
  const bannerHeight = 48; // 大约 48px 高度
  
  // Banner 组件
  function Banner() {
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
      // 添加 padding-top 以避免内容被 banner 遮挡
      const currentPaddingTop = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
      document.body.style.paddingTop = (currentPaddingTop + bannerHeight) + 'px';
      
      // 清理函数：当组件卸载时移除 padding-top
      return () => {
        const currentPaddingTop = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
        document.body.style.paddingTop = Math.max(0, currentPaddingTop - bannerHeight) + 'px';
      };
    }, []);
    
    const handleClose = () => {
      setIsVisible(false);
      // 移除 padding-top
      const currentPaddingTop = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
      document.body.style.paddingTop = Math.max(0, currentPaddingTop - bannerHeight) + 'px';
    };
    
    const handleJump = () => {
      window.location.href = 'https://aiwan.run/zh/posts';
    };
    
    if (!isVisible) return null;
    
    return React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#ff6b6b',
        color: '#fff',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px'
      }
    }, [
      React.createElement('div', {
        key: 'content',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1
        }
      }, [
        React.createElement('span', {
          key: 'icon',
          style: {
            fontSize: '18px'
          }
        }, '⚠️'),
        React.createElement('span', {
          key: 'text'
        }, '本站已迁移至新地址，点击跳转：'),
        React.createElement('a', {
          key: 'link',
          href: 'https://aiwan.run/posts',
          onClick: (e) => {
            e.preventDefault();
            handleJump();
          },
          style: {
            color: '#fff',
            textDecoration: 'underline',
            fontWeight: 'bold',
            cursor: 'pointer'
          }
        }, 'https://aiwan.run/posts')
      ]),
      React.createElement('button', {
        key: 'close',
        onClick: handleClose,
        style: {
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          marginLeft: '12px',
          transition: 'background 0.2s'
        },
        onMouseOver: function(e) {
          e.target.style.background = 'rgba(255,255,255,0.3)';
        },
        onMouseOut: function(e) {
          e.target.style.background = 'rgba(255,255,255,0.2)';
        }
      }, '✕ 关闭')
    ]);
  }
  
  // 创建容器并渲染 Banner
  const bannerContainer = document.createElement('div');
  bannerContainer.id = 'site-banner-container';
  document.body.insertBefore(bannerContainer, document.body.firstChild);
  
  // 使用 React 18 的 createRoot API（如果可用），否则使用旧的 render API
  if (ReactDOM.createRoot) {
    const root = ReactDOM.createRoot(bannerContainer);
    root.render(React.createElement(Banner));
  } else {
    ReactDOM.render(React.createElement(Banner), bannerContainer);
  }
}
