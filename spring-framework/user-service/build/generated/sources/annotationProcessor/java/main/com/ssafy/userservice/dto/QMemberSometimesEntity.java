package com.ssafy.userservice.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberSometimesEntity is a Querydsl query type for MemberSometimesEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberSometimesEntity extends EntityPathBase<MemberSometimesEntity> {

    private static final long serialVersionUID = -2045946047L;

    public static final QMemberSometimesEntity memberSometimesEntity = new QMemberSometimesEntity("memberSometimesEntity");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public QMemberSometimesEntity(String variable) {
        super(MemberSometimesEntity.class, forVariable(variable));
    }

    public QMemberSometimesEntity(Path<? extends MemberSometimesEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberSometimesEntity(PathMetadata metadata) {
        super(MemberSometimesEntity.class, metadata);
    }

}

