import React from "react";
import * as UtilAction from './_util/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ws from '../lib/ws';
import toast from '../components/Toast';

class App extends React.Component{

    componentDidMount() {
        let {actions} = this.props;
	    ws.get({
		    url: '/api/self/info'
	    }).then(response => {
		    if(response.code === 0) {
			    if(response.data.phone != null) {
			        actions.utilAction.changeSelfInfo(response.data);
			    }
		    } else {
			    toast.show(response.message);
		    }
	    })
	    // 获取品牌列表
	    ws.get({
		    url: '/api/truck/brands'
	    }).then(response => {
		    if(response.code === 0) {
		    	actions.utilAction.changeTruckBrandList(response.data);
		    } else {
			    toast.show(response.message);
		    }
	    });
	    // 获取定位
	    let mapObj = new AMap.Map('iCenter');
	    mapObj.plugin('AMap.Geolocation', function () {
		    let geolocation = new AMap.Geolocation({
			    enableHighAccuracy: false,//是否使用高精度定位，默认:true
			    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
			    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			    showButton: true,        //显示定位按钮，默认：true
			    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
			    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			    showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
			    showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
			    panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
			    zoomToAccuracy:false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		    });
		    mapObj.addControl(geolocation);
		    geolocation.getCurrentPosition();
		    AMap.event.addListener(geolocation, 'complete', function(data) {
		    	actions.utilAction.changeCurrentPostion({
		    		locationLng: data.position.getLng(),
				    locationLat: data.position.getLat(),
				    location: data.position.formattedAddress,
			    });

		    });//返回定位信息
		    AMap.event.addListener(geolocation, 'error', function() {
			    toast.show("定位失败");
		    });      //返回定位出错信息
	    });

    }

    render() {
        return (
            <div className="page">
                {this.props.children}
                <div id="iCenter" style={{display: 'none'}}></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let utilState = state.reducers.util.toJS();
    return {
        util: utilState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

