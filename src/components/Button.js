import classNames from "classnames"

const Button = ({onClick, className, outline, children }) => {
    return(
        <button
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
                {children}
            {/* <a href="/cart.html" className="button button--cart">
            
                </a> */}
        </button>
    )
}

export default Button