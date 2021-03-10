import { Button } from "react-bootstrap";
import { LAST_UP_DATE, PROJECT_URL, TWITTER_SHARE_URL } from "../constant/other";

const AppInfo: React.FC = () => (<>
  <span className="mr-3 d-none d-sm-inline">最終更新：{LAST_UP_DATE}</span>
  <span className="mr-3"><a href={PROJECT_URL} rel="noreferrer" target="_blank">プロジェクトURL</a></span>
  <Button size="sm" href={TWITTER_SHARE_URL} target="_blank">Twitterにシェア</Button>
</>);

export default AppInfo;
