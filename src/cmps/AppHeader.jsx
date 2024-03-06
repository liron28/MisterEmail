import menu from "../assets/imgs/menu.svg";
import logoUrl from "../assets/imgs/logo_gmail_header.png";
import questionUrl from "../assets/imgs/question_mark.svg";
import settings from "../assets/imgs/settings.svg";
import apps from "../assets/imgs/apps.svg";
import user from "../assets/imgs/user_icon.png";

// import { EmailSearch } from "./EmailSearch";
import {Icon} from "../cmps/Icon";

export function AppHeader({ filterBy, onSetFilter }) {
  const icons = [
    { src: questionUrl, alt: 'help' },
    { src: settings, alt: 'settings' },
    { src: apps, alt: 'apps' },
    { src: user, alt: 'user', style: 'user-image' }
    ]
  return (
    <header className="app-header">
      <section className="container">
        <Icon iconData={{ src: menu, alt: 'menu' }} />
        <img src={logoUrl} alt="logo_img" />
        {/* <EmailSearch filterBy={filterBy} onSetFilter={onSetFilter} /> */}
            {icons.map((icon, index) => {
                return <Icon iconData={icon} key={index} />
                })}
            </section>
        </header>
  )
}
