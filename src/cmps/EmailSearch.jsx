import { useEffect,useState } from "react"

export function EmailSearch({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        let { value, name: field } = ev.target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    function onSubmit(ev) {
        const { keyCode } = ev
        if (keyCode === 13) {
            onSetFilter(filterByToEdit)
        }
    }

  return (
    <div className='email-search'>
            <label>
                <input placeholder='Search mail' type="text"
                    name="searchStr"
                    value={filterByToEdit}
                     onKeyDown={onSubmit}
                     onChange={handleChange} />
            </label>
        </div>
  )
}

