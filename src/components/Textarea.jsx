import React, { useEffect, useRef } from "react";

const Textarea = ({ value, onChange, id, name, section }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      id={id}
      name={name}
      data-section={section}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ overflow: "hidden" }}
    />
  );
};

export default Textarea;
