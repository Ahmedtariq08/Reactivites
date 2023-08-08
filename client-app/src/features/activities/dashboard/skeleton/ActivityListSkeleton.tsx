import Skeleton from "react-loading-skeleton";

const ActivityListSkeleton = () => {
    return (
        <section>
            <h2 className="section-title">
                <Skeleton height={30} width={300} />
            </h2>

            <ul className="list">
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <li className="card" key={index}>
                        <Skeleton height={180} />
                        <h4 className="card-title">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton height={36} width={`80%`} />
                        </h4>
                        <p className="card-channel">
                            <Skeleton width={`60%`} />
                        </p>
                        <div className="card-metrics">
                            <Skeleton width={`90%`} />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ActivityListSkeleton;