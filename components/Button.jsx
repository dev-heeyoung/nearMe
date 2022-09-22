import Link from 'next/link'

const Button = ({ text, href }) => {
    return (
      <div className="cursor-pointer bg-gradient-to-r from-emerald-400 to-emerald-700 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-emerald-600 hover:border-2 hover:border-emerald-600">
        <Link href={href}>
          <a href={href}>
            {text}
          </a>         
        </Link>
        </div>
      )
}

export default Button