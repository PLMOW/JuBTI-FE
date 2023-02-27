import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useDetectClose from '../hook/useDetectClose'

interface Itodolist {
  optionData: string[]
  selectData: any
}
const SelectBoxs = ({
  optionData,
  selectData,
}: Itodolist): React.ReactElement => {
  const [currentValue, setCurrentValue] = useState(null)

  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅

  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target
    setCurrentValue(innerText)
    selectData(innerText)
  }

  return (
    <SelectBox
      ref={dropDownRef}
      onClick={() => setIsOpen((prev: any) => !prev)}
    >
      <Label>{currentValue}</Label>
      {isOpen && (
        <SelectOptions>
          {optionData.map((data: any, index) => (
            <Option
              key={index}
              value={data.value}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectBox>
  )
}
const SelectBox = styled.div<{ ref: any }>`
  margin-bottom: 80px;
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 8px 28px;
  border-radius: 12px;
  background-color: #ffffff;
  justify-content: space-between;
  align-self: center;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: 2px solid #000;
  cursor: pointer;
  &::after {
    content: '▼';
    /* position: absolute;
    top: 1px;
    right: 8px; */
    color: #000;
    font-size: 14px;
  }
`
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`
const SelectOptions = styled.ul<{ ref?: any }>`
  position: absolute;
  list-style: none;
  top: 50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: auto;
  padding: 0;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #000;
  max-height: none;
`
const Option = styled.li`
  font-size: 14px;
  padding: 16px 18px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #ddd;
  }
`

export default SelectBoxs
