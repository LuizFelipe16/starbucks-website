import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

import styles from './NavItem/styles.module.scss';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (!!shouldMatchExactHref && (asPath === rest.href || asPath === rest.as))
    isActive = true;

  if (
    !shouldMatchExactHref
    && (asPath.startsWith(String(rest.href))
      || asPath.startsWith(String(rest.as)))
  ) isActive = true;

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: !!isActive ? `${styles.link} ${styles.active_link}` : styles.link,
      })}
    </Link>
  );
}