import React from 'react';

export default function Button({ children, textOnly, className, ...props }) {
  // Determine the CSS classes based on the 'textOnly' prop
  let cssClasses = textOnly ? 'text-button' : 'button';

  // Concatenate additional class names if provided
  cssClasses += ' ' + className;

  return (
    // Render a button element with specified props and CSS classes
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}
