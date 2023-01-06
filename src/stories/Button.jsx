import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * 用于用户交互的主要 UI 组件
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * 这是页面上的主要号召性用语吗？
   */
  primary: PropTypes.bool,
  /**
   * 使用什么背景颜色
   */
  backgroundColor: PropTypes.string,
  /**
   * 按钮应该有多大？
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   *按钮内容
   */
  label: PropTypes.string.isRequired,
  /**
   * 可选的点击处理程序
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
