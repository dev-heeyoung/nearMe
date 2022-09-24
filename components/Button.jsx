import Link from 'next/link'

const Button = ({ text, href }) => {
    return (
        <Link href={href}>
          <a className="cursor-pointer bg-cyan-800 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base rounded-full font-semibold text-white hover:font-bold hover:text-bg-inherit hover:border-2 hover:border-cyan-900" href={href}>
            {text}
          </a>
        </Link>
      )
}

export default Button