import { Announcement } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";
import { nameToString } from "@/app/lib/typeConvertion";
import { formatDate } from "@/app/lib/typeConvertion";

export default function Announcements({ announcements }: { announcements: Announcement[] }) {
    return (
        <div id="announcementsConDB" className="whiteBox">
            <div id="announcementsTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="announcementsTitleDB" className="text-xl font-bold">Announcements</h3>
            </div>
            <div id="announcementsListConDB" className="flex flex-col justify-flex-start items-flex-start gap-5 p-2">
                {announcements.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">No announcements yet</div>
                ) : (
                    announcements.map((announcement, index) => (
                        <div className={`announcementItemDB flex flex-col justify-flex-start items-flex-start gap-1 ${index > 0 ? 'border-t border-gray-300 pb-2 pt-2' : ''}`} key={`announcementItemS${announcement.id}`}>
                            <div className="announcementProfileConDB flex justify-between items-center w-full">
                                <div className="announcementProfileInfoConDB flex justify-flex-start items-center gap-2">
                                    <div className="announcementProfilePicConDB">
                                        <FiUser className="announcementProfilePicDB text-2xl bg-white rounded-full" />
                                    </div>
                                    <div className="announcementProfileDisConDB gap-0.1">
                                        <h3 className="announcementProfileNameDB text-sm m-0 p-0">{nameToString(announcement.userFirstName ?? '', announcement.userLastName ?? '')}</h3>
                                        <h4 className="announcementProfilePositionDB text-xs m-0 p-0 text-zinc-500">{announcement.userTitle}</h4>
                                    </div>
                                </div>
                                <div className="announcementProfileOptionsConDB">
                                    <h4 className="announcementProfileOptionsDB text-sm m-0 p-0 text-zinc-500">{formatDate(announcement.createdAt)}</h4>
                                </div>
                            </div>
                            <div id="announcementContentConDB" className="flex flex-col justify-flex-start items-flex-start gap-1">
                                <h3 id="announcementContentTitleDB">{announcement.title}</h3>
                                <p id="announcementContentTextDB">{announcement.content}</p>
                                {announcement.imageUrl && (
                                    <div id="announcementContentPicConDB">
                                        <img id="announcementContentPicDB" src={announcement.imageUrl} alt="Announcement picture" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}