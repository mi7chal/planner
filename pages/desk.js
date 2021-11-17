import Head from 'next/head';
import Nav from '../components/Nav';
import styles from '../styles/Desktop.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import indeksImage from '../public/indeks.jpg';
import CommonBox from '../components/workspaceModules/CommonBox';
import { useDispatch, useSelector } from 'react-redux';
import { deskPush } from '../redux/actions';




export default function Desk() {
  let maxLeft = -10000;
  let maxTop = -10000;
  const deskElements = useSelector(state => state.deskElements);
  const dispatch = useDispatch();
  useEffect(() => {
    workspace.current.style.top = '80px';
    workspace.current.style.left = `${-5000 + window.screen.width / 2}px`;
    maxLeft = -10000 + window.screen.width;
    maxLeft = -10000 + window.screen.height;
    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseup', mouseUpListener);
    }
  }, [])
  useEffect(() => {
    console.log("RERENDER")
  }, [deskElements])
  const [workspaceItems, setWorkspaceItems] = useState();

  let coords = {};
  let isScrollDown = false;
  let isLeftDown = false;
  let wasMoved = true;

  const workspace = useRef();

  const mouseMoveListener = (e) => {
    wasMoved = true;
    if (!isScrollDown)
      return 1;
    let x = e.pageX;
    let y = e.pageY;
    let top = workspace.current.style.top;
    let left = workspace.current.style.left;

    left = Number(left.substr(0, left.length - 2));
    top = Number(top.substr(0, top.length - 2));
    let toSetTop = top + (y - coords.oldY);
    let toSetLeft = left + (x - coords.oldX);
    if (toSetLeft > 0)
      toSetLeft = 0;
    else if (toSetLeft < maxLeft)
      toSetLeft = maxLeft

    if (toSetTop > 80)
      toSetTop = 80;
    else if (toSetTop < maxTop)
      toSetTop = maxTop;

    workspace.current.style.top = toSetTop + 'px';
    workspace.current.style.left = toSetLeft + 'px';

    coords.oldX = x;
    coords.oldY = y;
  }


  const mouseUpListener = (e) => {
    if (isScrollDown == false && isLeftDown == false)
      return 1;

    if (isScrollDown == true) {
      window.removeEventListener('mousemove', mouseMoveListener);
      isScrollDown = false;
    }
    else if (isLeftDown == true) {
      isLeftDown = false;
      if (wasMoved == false)
        onClick(e);

    }
  }

  const checkIfMove = (e) => {
    wasMoved = true;
  }


  const mouseDown = (e) => {
    if (e.button == 1) {
      if (isScrollDown == true)
        return 1;
      window.addEventListener('mousemove', e => mouseMoveListener(e));
      coords.oldY = e.pageY;
      coords.oldX = e.pageX;
      isScrollDown = true;
    }
    else if (e.button == 0) {
      if (isLeftDown == true)
        return 1;

      window.addEventListener('mousemove', e => checkIfMove(e));

      isLeftDown = true;
      wasMoved = false;
    }

  }
  let top;
  let left;
  let keyNum = 0;

  const onClick = (e) => {
    // e.pageX;
    // e.pageY;
    window.removeEventListener('mousemove', checkIfMove);
    top = workspace.current.offsetTop * -1 + e.pageY;
    left = workspace.current.offsetLeft * -1 + e.pageX;
    if (top % 2 == 1)
      top--;
    if (left % 2 == 1)
      left--;

    dispatch(deskPush({ type: 0, top: top, left: left }));
    keyNum++;
  }



  return (
    <>
      <Head>
        <title>Planner - my desk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.background}>
        <Nav />

        <div style={{ width: 10000, height: 10000 }} onMouseDown={e => mouseDown(e)} onMouseUp={e => { mouseUpListener(e) }}>

          <div ref={workspace} className={styles.workspace}>
            {deskElements.map((x, i) => { if (x) return < CommonBox id={i} key={i} ></CommonBox > })}
          </div>
        </div>

      </div>

    </>
  )
}


