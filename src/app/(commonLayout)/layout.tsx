import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            {/* <PublicFooter /> */}
        </>
    );
};

export default CommonLayout;
