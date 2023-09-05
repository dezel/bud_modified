import "./pageheader.scss";

const PageHeader = ({ icon, mainTitle, subTitle }) => {
  return (
    <div className="headerPaper">
      <div className="headerContainer">
        <div className="headerIconContainer">{icon}</div>
        <div className="headerTitle">
          <div className="mainTitle">{mainTitle}</div>
          <div className="subTitle">{subTitle}</div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
