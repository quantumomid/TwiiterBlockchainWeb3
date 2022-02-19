import React from "react";
import { IconType } from 'react-icons'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from "next/router";

const style = {
    wrapper: "w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out",
    iconContainer: "text-xl mr-4",
    textGeneral: "font-medium",
    textActive: "font-bold",
}

interface SidebarOptionProps {
    text: String
    Icon: IconType
    isActive?: Boolean
    setSelected?: Dispatch<SetStateAction<String>>
    redirect?: URL | string
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ text, Icon, isActive, setSelected, redirect }) => {
    const router = useRouter();

    const handleClick = (buttonText = text) => {
        if (buttonText !== 'More' && setSelected) {
          setSelected(buttonText)
        } 
        if (redirect) {
            router.push(redirect)
        }
    }

    return (
        <li
            className={style.wrapper}
            onClick={() => handleClick(text)}
        >
            <div className={style.iconContainer}>
                <Icon />
            </div>
            <p className={`${isActive ? style.textActive : style.textGeneral}`}>
                {text}
            </p>
        </li>
    )
}

export default SidebarOption;