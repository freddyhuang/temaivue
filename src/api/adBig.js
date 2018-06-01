/**
3.轮播广告
url：${pageContext.request.contextPath}/temai/index/adBig
参数：
请求方式：ajax  post 
-----------------------------
 */
export function getadBig() {

	const url = '${pageContext.request.contextPath}/temai/index/adBig';
	const data = qs.stringify({
		username: 13631458340,
		password: 123123,
		code:2365
	});

	return axios.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}