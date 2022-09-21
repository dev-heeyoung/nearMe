import Link from 'next/link'

const Button = ({ text, href }) => {
    return (
        <Link href={href}>
          <a className="bg-red-600 cursor-pointer text-white rounded" href={href}>
            {text}
          </a>
        </Link>
      )
}

export default Button