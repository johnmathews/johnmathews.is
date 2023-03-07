import { useRefinementList } from 'react-instantsearch-hooks-web'

export function RefinementList(props) {
  // Retrieves the refinement `items` and the `refine` function to update the
  // refinement
  const { items, refine } = useRefinementList(props)

  return (
    <div id="searchy" className="m-19 border-read-500 ais-RefinementList border-2">
      <ul className="ais-RefinementList-list">
        {items.map((item) => (
          <li
            key={item.value}
            className={cx(
              'ais-RefinementList-item',
              item.isRefined && 'ais-RefinementList-item--selected'
            )}
          >
            <label className="ais-RefinementList-label">
              <input
                className="ais-RefinementList-checkbox"
                type="checkbox"
                value={item.value}
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
              <span className="ais-RefinementList-labelText">{item.label}</span>
              <span className="ais-RefinementList-count">{item.count}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ')
}
