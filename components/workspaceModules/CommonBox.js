import styles from '../../styles/Desktop.module.scss';
import Image from 'next/image';
import closeImage from '../../public/close.svg';
import moveImage from '../../public/move.svg';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deskEdit, deskSplice } from '../../redux/actions';
import TextBox from '../TextBox';

//export default function CommonBox({ top, left }) {
export default function CommonBox({ id }) {


  const [rerender, setRerender] = useState(0);
  const dispatch = useDispatch();
  const deskElements = useSelector(state => state.deskElements);
  if (deskElements[id] == undefined)
    return null;

  useEffect(() => {

  }, [deskElements[id]])
  let isScrollDown = false;
  let coords = {};

  const object = useRef();


  useEffect(() => {
    console.log(deskElements)
    object.current.style.top = deskElements[id].top + "px";
    object.current.style.left = deskElements[id].left + "px";
  })
  if (rerender != 0)
    return null;

  const mouseMoveListener = (e) => {
    if (!isScrollDown)
      return 1;
    let x = e.pageX;
    let y = e.pageY;
    let top = object.current.style.top;
    let left = object.current.style.left;

    left = Number(left.substr(0, left.length - 2));
    top = Number(top.substr(0, top.length - 2));
    let toSetTop = top + (y - coords.oldY);
    let toSetLeft = left + (x - coords.oldX);
    top = toSetTop;
    left = toSetLeft;

    object.current.style.top = toSetTop + 'px';
    object.current.style.left = toSetLeft + 'px';

    coords.oldX = x;
    coords.oldY = y;
  }


  const mouseUpListener = (e) => {
    console.log("!32");



    if (isScrollDown == false)
      return 1;

    if (e.button == 0) {
      dispatch(deskEdit({ type: 0, top: object.current.offsetTop, left: object.current.offsetLeft }, id))
      window.removeEventListener('mousemove', mouseMoveListener);
      isScrollDown = false;
    }
    console.log(deskElements)

  }




  const mouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.button == 0) {
      if (isScrollDown == true)
        return 1;
      isScrollDown = true;
      window.addEventListener('mousemove', e => mouseMoveListener(e));
      coords.oldY = e.pageY;
      coords.oldX = e.pageX;

    }

  }
  const mousePrevent = (e) => {
    if (e.button == 0) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  const onClose = () => {
    console.log(131231233);
    object.current.style.display="none";
    dispatch(deskSplice(id))
  }



  return (
    <div style={{ position: 'absolute' }} onMouseDown={e => { e.stopPropagation() }} className={styles.commonBox} ref={object} onMouseUp={(e) => mouseUpListener(e)}>
      <div className={styles.commonBoxHeader} onMouseDown={(e) => mousePrevent(e)}>
        <div className={styles.commonBoxIcons} >
          <div className={styles.commonBoxIconBox} onClickCapture={() => onClose()}><Image src={closeImage} className={styles.commonBoxClose} width={16} height={16}></Image></div>
          <div className={styles.commonBoxIconBox} onMouseDownCapture={(e) => mouseDown(e)}><Image src={moveImage} className={styles.commonBoxMove} width={22} height={22}></Image></div>
        </div>
      </div>
      <div className={styles.commonBoxBody} >
        <TextBox />
      </div>
    </div >
  )
}
