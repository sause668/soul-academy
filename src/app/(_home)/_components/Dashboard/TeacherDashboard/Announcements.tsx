import OpenModalButton from "../../OpenModalComponents/OpenModalButton";
import { Announcement } from "@/app/lib/definitions";
import { FiPlus, FiUser } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import { formatDate } from "@/app/lib/typeConvertion";
import { nameToString } from "@/app/lib/typeConvertion";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";

export default function Announcements({ announcements, userId }: { announcements: Announcement[], userId: number }) {
    return (
        <div id="announcementsConDB" className="whiteBox">
              <div id="announcementsTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="announcementsTitleDB" className="text-xl font-subtitle font-bold">Announcements</h3>
                <OpenModalButton
                  buttonText={<FiPlus className="text-2xl" />}
                  modalComponent={`<CreateAnnouncementModal />`}
                  cssClasses={'newClassButtonDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-colors duration-300'}
                />
              </div>
              <div id="announcementsListConDB" className="flex flex-col justify-flex-start items-flex-start gap-5 p-2 font-body">
                {announcements.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No announcements yet</div>
                ) : (
                  announcements.map((announcement, index) => {
                    const isOwner = announcement.userId === userId;
                    return (
                      <div className={`announcementItemDB flex flex-col justify-flex-start items-flex-start gap-1 ${index > 0 ? 'border-t border-gray-300 pb-2 pt-2' : ''}`} key={`announcementItemT${announcement.id}`}>
                        <div className="announcementProfileConDB flex justify-between items-center w-full">
                          <div className="announcementProfileInfoConDB flex justify-flex-start items-center gap-2">
                            <div className="announcementProfilePicConDB">
                              <FiUser className="announcementProfilePicDB text-2xl bg-white rounded-full"/>
                            </div>
                            <div className="announcementProfileDisConDB gap-0.1">
                              <div className="flex items-center gap-2">
                                <h3 className="announcementProfileNameDB font-subtitle text-sm m-0 p-0">{nameToString(announcement.userFirstName ?? '', announcement.userLastName ?? '')}</h3>
                                {isOwner && (
                                  <div className="flex items-center gap-1 pl-2">
                                    <OpenModalButton
                                      buttonText={<MdEdit className="text-sm" />}
                                      modalComponent={'<EditAnnouncementModal announcement={announcement} />'}
                                      cssClasses={'text-sm m-0 p-1 bg-blue-500 text-white rounded border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'}
                                    />
                                    <OpenModalButton
                                      buttonText={<MdDelete className="text-sm" />}
                                      modalComponent={'<DeleteAnnouncementModal announcement={announcement} />'}
                                      cssClasses={'text-sm m-0 p-1 bg-red-500 text-white rounded border-2 border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors duration-300 '}
                                    />
                                  </div>
                                )}
                              </div>
                              <h4 className="announcementProfilePositionDB text-xs m-0 p-0 text-zinc-500">{announcement.userTitle}</h4>
                            </div>
                          </div>
                          <div className="announcementProfileOptionsConDB">
                            <h4 className="announcementProfileOptionsDB font-subtitle text-md m-0 p-0 text-zinc-500">{formatDate(announcement.createdAt)}</h4>
                          </div>
                        </div>
                        <div className="announcementContentConDB flex flex-col justify-flex-start items-flex-start gap-1">
                          <h3 className="announcementContentTitleDB font-subtitle text-lg font-bold">{announcement.title}</h3>
                          <p className="announcementContentTextDB font-body text-md">{announcement.content}</p>
                          {announcement.imageUrl && (
                            <div id="announcementContentPicConDB">
                              <img id="announcementContentPicDB" src={announcement.imageUrl} alt="Announcement picture" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
    );
}