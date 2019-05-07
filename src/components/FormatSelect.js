import React from 'react'

const FormatSelect = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={'typeSelect slideInFromTop'}>
        <div>SELECT A FORMAT</div>
        <div className={'radioButtons'}>
        <input id='quickTypeSelect1' onChange={props.onChange} checked={props.quickType==="1"} value={"1"} name='quickType' type='radio'></input>
            <label htmlFor='quickTypeSelect1'>HD VIDEO</label>
            <input id='quickTypeSelect2' onChange={props.onChange} checked={props.quickType==="2"} value={"2"} name='quickType' type='radio'></input>
            <label htmlFor='quickTypeSelect2'>BEST AUDIO</label>
            <input id='quickTypeSelect3' onChange={props.onChange} checked={props.quickType==="3"} value={"3"} name='quickType' type='radio'></input>
            <label htmlFor='quickTypeSelect3'>SMALLEST AUDIO</label>
        </div>       
        <div className={'advancedType'}>
            <div>ADVANCED FORMATS</div>
            <select name='typeSelect' onChange={props.onChange} value={props.typeSelect}>
                {(typeof props.videoInfo.formats =="object")&&props.videoInfo.formats.map((item,index)=>
                <option value={index}>{'type: '+item.type +' quality: '+ item.quality+ ' '+(item.videoOnly?'only video':'')}</option>
                )}
            </select>
        </div>
        <input className='roundedButton' value='DOWNLOAD' type="submit"></input>
    </form>
  )
}

export default FormatSelect
