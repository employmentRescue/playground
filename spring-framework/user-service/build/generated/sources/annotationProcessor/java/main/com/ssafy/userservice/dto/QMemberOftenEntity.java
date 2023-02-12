package com.ssafy.userservice.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberOftenEntity is a Querydsl query type for MemberOftenEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberOftenEntity extends EntityPathBase<MemberOftenEntity> {

    private static final long serialVersionUID = -1653337515L;

    public static final QMemberOftenEntity memberOftenEntity = new QMemberOftenEntity("memberOftenEntity");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath mobile_fcm_token = createString("mobile_fcm_token");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final ListPath<activitiesEntity, QactivitiesEntity> prefer_activities = this.<activitiesEntity, QactivitiesEntity>createList("prefer_activities", activitiesEntity.class, QactivitiesEntity.class, PathInits.DIRECT2);

    public final StringPath prefer_time = createString("prefer_time");

    public final StringPath status_message = createString("status_message");

    public final StringPath user_profile_img_url = createString("user_profile_img_url");

    public final StringPath web_fcm_token = createString("web_fcm_token");

    public QMemberOftenEntity(String variable) {
        super(MemberOftenEntity.class, forVariable(variable));
    }

    public QMemberOftenEntity(Path<? extends MemberOftenEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberOftenEntity(PathMetadata metadata) {
        super(MemberOftenEntity.class, metadata);
    }

}

