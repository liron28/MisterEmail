import { Icon } from './Icon';

export function PrevMailActionBtn({ path, style }) {
    function onIconClicked(ev, iconType) {
        ev.stopPropagation()
    }
    return (
        <div className={`flex ${style}`}>
            <span onClick={(ev) => onIconClicked(ev, 'archive')}>
                <Icon iconData={{ src: path.archiveImg, style: 'remove-padding' }} />
            </span>
            <span onClick={(ev) => onIconClicked(ev, 'delete')}>
                <Icon iconData={{ src: path.deleteImg, style: 'remove-padding' }} />
            </span>
            <span onClick={(ev) => onIconClicked(ev, 'status')}>
                <Icon iconData={{ src: path.unreadImg, style: 'remove-padding' }} />
            </span>
        </div>
    )
}