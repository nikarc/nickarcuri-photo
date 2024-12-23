// const NavLink = ({ children }: { children: React.ReactNode }) => {
//     return <li className="tracking-tighter text-lg">{children}</li>;
// };
//
// const NavList = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <ul className="flex flex-col gap-2 content-center pl-6">{children}</ul>
//     );
// };

export const Header = () => {
    // TODO: Film leader font???
    return (
        <header>
            <div className="sticky top-0">
                <div className="p-8 max-w-72 flex flex-col gap-10">
                    <h1 className="font-serif text-5xl tracking-tightest">Nick Arcuri</h1>
                </div>
            </div>
        </header>
    );
};
