import React, { useState, useEffect } from 'react'
import './style.scss'
import expandIcon from '../../assets/images/expand-icon.svg'

const NavList = () => {
    const [expandedItem, setExpandedItem] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [activeItem, setActiveItem] = useState(null)
    const [showFlyout, setShowFlyout] = useState(false)

    const navlist = [
        { name: "Home", link: "/", icon: false, submenu: [] },
        {
            name: "About",
            link: "/about",
            icon: true,
            submenu: [
                { name: "Overview", link: "/about/overview" },
                { name: "History", link: "/about/history" },
                { name: "Vision & Mission", link: "/about/vision" }
            ]
        },
        {
            name: "Departments",
            link: "/departments",
            icon: true,
            submenu: [
                { name: "Engineering", link: "/departments/engineering" },
                { name: "Science", link: "/departments/science" },
                { name: "Commerce", link: "/departments/commerce" }
            ]
        },
        {
            name: "Admissions",
            link: "/admissions",
            icon: true,
            submenu: [
                { name: "Apply Now", link: "/admissions/apply" },
                { name: "Requirements", link: "/admissions/requirements" }
            ]
        },
        { name: "Courses", link: "/courses", icon: true, submenu: [] },
        { name: "NAAC", link: "/naac", icon: true, submenu: [] },
        {
            name: "Academics",
            link: "/academics",
            icon: true,
            submenu: [
                { name: "Calendar", link: "/academics/calendar" },
                { name: "Syllabus", link: "/academics/syllabus" }
            ]
        },
        { name: "Facilities", link: "/facilities", icon: true, submenu: [] },
        { name: "Placement", link: "/placement", icon: false, submenu: [] },
        { name: "Gallery", link: "/gallery", icon: false, submenu: [] },
        { name: "Contact", link: "/contact", icon: false, submenu: [] },
    ]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const currentPath = window.location.pathname

        // Check if current path matches any main item
        let activeIndex = navlist.findIndex(item => item.link === currentPath)

        // If no main item matches, check if any submenu item matches
        if (activeIndex === -1) {
            activeIndex = navlist.findIndex(item =>
                item.submenu.some(subitem => subitem.link === currentPath)
            )
        }

        setActiveItem(activeIndex !== -1 ? activeIndex : null)
    }, [])

    const handleItemHover = (index) => {
        if (isMobile) {
            setExpandedItem(expandedItem === index ? null : index)
        } else {
            setExpandedItem(index)
        }
    }

    const handleItemLeave = () => {
        if (!isMobile) {
            setExpandedItem(null)
        }
    }

    if (isMobile) {
        return (
            <div className='navlist-container-mobile'>
                <div className='breadcrumb-container'>
                    <button
                        className='menu-icon-btn'
                        onClick={() => setShowFlyout(!showFlyout)}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <span className='breadcrumb-item active'>Menu</span>
                </div>

                {showFlyout && (
                    <div className='flyout-overlay' onClick={() => setShowFlyout(false)}></div>
                )}

                <div className={`flyout-container ${showFlyout ? 'active' : ''}`}>
                    <div className='flyout-header'>
                        <span>Menu</span>
                        <button
                            className='close-btn'
                            onClick={() => setShowFlyout(false)}
                            aria-label="Close menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className='flyout-content'>
                        {navlist.map((item, index) => (
                            <div key={index} className='flyout-item'>
                                <div
                                    className={`flyout-header-item ${activeItem === index || expandedItem === index ? 'expanded' : ''}`}
                                    onClick={() => {
                                        if (item.submenu.length > 0) {
                                            setExpandedItem(expandedItem === index ? null : index)
                                        } else {
                                            setShowFlyout(false)
                                        }
                                    }}
                                >
                                    <a href={item.link} className='flyout-title'>
                                        {item.name}
                                    </a>
                                    {item.icon && item.submenu.length > 0 && (
                                        <img
                                            className={`expand-icon ${expandedItem === index ? 'rotated' : ''}`}
                                            src={expandIcon}
                                            alt="expand"
                                        />
                                    )}
                                </div>

                                {expandedItem === index && item.submenu.length > 0 && (
                                    <div className='flyout-submenu'>
                                        {item.submenu.map((subitem, subindex) => (
                                            <a
                                                key={subindex}
                                                href={subitem.link}
                                                className='flyout-submenu-item'
                                                onClick={() => setShowFlyout(false)}
                                            >
                                                {subitem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Desktop view
    return (
        <div className='navlist-container'>
            {navlist.map((item, index) => (
                <div
                    key={index}
                    className={`list-item-container ${activeItem === index || expandedItem === index ? 'active' : ''}`}
                    onMouseEnter={() => setExpandedItem(index)}
                    onMouseLeave={() => setExpandedItem(null)}
                >
                    <a className='navlist-item' href={item.link}>{item.name}</a>
                    {item.icon && (
                        <img
                            className={`expand-icon ${expandedItem === index ? 'rotated' : ''}`}
                            src={expandIcon}
                            alt="expandIcon"
                        />
                    )}

                    {expandedItem === index && item.submenu.length > 0 && (
                        <div className='submenu-dropdown'>
                            {item.submenu.map((subitem, subindex) => (
                                <a
                                    key={subindex}
                                    href={subitem.link}
                                    className='submenu-item'
                                >
                                    {subitem.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default NavList
