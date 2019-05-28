//

//
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//提示的视图生成
const Alert = ({ alerts }) =>
  //判断参数不为空
  alerts !== null &&
  //长度大于0
  alerts.length > 0 &&
  //映射对应的html
  alerts.map(alert => (
    <div key={alert.id} className={`alert  alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

//属性的数组为必须
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

//
const mapStateToProps = state => ({
  alerts: state.alert
});

//导出并连接事件对象
export default connect(mapStateToProps)(Alert);
