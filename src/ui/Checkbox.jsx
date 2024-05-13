import React from 'react';
import './style.css'

const Checkbox = ({typeUserId=2, checked, setChecked, type}) => {
  return (
    <div className="checkbox-wrapper-2">
      {typeUserId === 1 ?
        <>
          <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={true}
                 onChange={() => setChecked(prev => ({...prev, [type]: true}))}/>
          <label htmlFor="" className='label'> Считать коробками</label>
        </>
         : typeUserId === 2 ?
          <>
            <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={checked}
                   onChange={e => setChecked(prev => ({...prev, [type]: e.target.checked}))}/>
            <label htmlFor="" className='label'> Считать коробками</label>
          </> : null
      }


    </div>
  );
};

export default Checkbox;