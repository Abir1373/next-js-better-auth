'use client'

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data, isPending } = useSession();
    const router = useRouter();

    if (isPending) {
        return <div>Pending...</div>;
    }

    const user = data?.user;

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login");
                },
            },
        });
    };

    const handleAuthClick = () => {
        if (user) {
            handleLogout();
        } else {
            router.push("/auth/login");
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            aria-label="Menu"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>

                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </div>

            <div className="navbar-end">
                <button className="btn" onClick={handleAuthClick}>
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;