import { cn } from '@/lib/utils'
import React, { FC, HTMLAttributes } from 'react'

type TypographyProps = {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'caption',
    text: string
    className?: string
} & HTMLAttributes<HTMLElement>
      
const Typography: FC<TypographyProps> = ({ variant, text, className, ...props }) => {

    const classNames = {
        h1: 'text-4xl font-bold scroll-m-20 tracking-tight lg:text-5xl',
        h2: 'text-3xl font-semibold tracking-tight scroll-m-16 lg:text-4xl',
        h3: 'text-2xl font-normal tracking-tight scroll-m-12 lg:text-3xl',
        h4: 'text-xl font-bold tracking-tight scroll-m-8 lg:text-2xl',
        h5: 'text-lg font-bold tracking-tight scroll-m-4 lg:text-xl',
        h6: 'text-base font-bold tracking-tight scroll-m-2 lg:text-lg',
        p: 'leading-7 [&:not(:first-child)]:mt-6 scroll-m-2',
        span: 'leading-7',
        label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        caption: 'text-sm font-medium leading-none',    
    }

    const Tag = variant || 'p'
    const defaultClassName = classNames[variant || 'p']
    const final_className = cn(defaultClassName, className)
 
  return (
    <Tag className={final_className} {...props}>
      {text}
    </Tag>
  )
}

export default Typography
