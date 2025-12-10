import MyProfile from "@/components/modules/Auth/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

const MyProfilePage = async () => {
    const userInfo = await getUserInfo();
    return <>
        <Suspense fallback={<div>Loading ...</div>}>
            <MyProfile userInfo={userInfo} />
        </Suspense>
    </>;
};

export default MyProfilePage;
