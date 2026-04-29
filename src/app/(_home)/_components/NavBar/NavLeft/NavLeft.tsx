import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";

export default function NavLeft() {
    return (
        <div id='leftSideConNB' className='flex items-center justify-start gap-4'>
            <NavLogo />
            <NavLinks />
        </div>
    )
}