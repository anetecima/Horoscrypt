import React from 'react'

const FormWrapper = ({ className = '', style = {}, children, props = {} }) => {
  const onSubmit = React.useCallback(e => e.preventDefault(), [])

  return (
    <form
      {...props}
      className={className}
      style={style}
      onSubmit={onSubmit}
      noValidate={true}
      autoComplete="false"
    >
      {children}
    </form>
  )
}

export default FormWrapper
