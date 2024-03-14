import path from '../services/image-path'
import { Icon } from './Icon';

export function MainHeader({ onSelected, onIconClicked, showActions }) {

    return (
        <div className='action-bar flex align-center'>
            <input type="checkbox" />
            <select
                className='select-dropdown'
                name="status"
                defaultValue="all"
                onChange={(e) => onSelected({ status: e.target.value })}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
            {/* <PrevMailActionBtn path={path} style={'icons-container'} /> */}
            {!!showActions && <div className={`flex `}>
                <span onClick={() => onIconClicked('archive')}>
                    <Icon iconData={{ src: path.archiveImg, style: 'remove-padding' }} />
                </span>
                <span onClick={() => onIconClicked('delete')}>
                    <Icon iconData={{ src: path.deleteImg, style: 'remove-padding' }} />
                </span>
                <span onClick={() => onIconClicked('status')}>
                    <Icon iconData={{ src: path.unreadImg, style: 'remove-padding' }} />
                </span>
            </div>}
        </div>
    )
}