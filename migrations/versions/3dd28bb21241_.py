"""empty message

Revision ID: 3dd28bb21241
Revises: 
Create Date: 2024-07-21 15:25:25.086193

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3dd28bb21241'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('actor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=300), nullable=True),
    sa.Column('lastname', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('director',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=300), nullable=True),
    sa.Column('lastname', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('genre',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre_name', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movie',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=300), nullable=False),
    sa.Column('length', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=950), nullable=True),
    sa.Column('release_date', sa.String(length=50), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('img_url', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('movie_actor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('actor_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['actor_id'], ['actor.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movie_director',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('director_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['director_id'], ['director.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movie_genre',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['genre_id'], ['genre.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('movie_genre')
    op.drop_table('movie_director')
    op.drop_table('movie_actor')
    op.drop_table('user')
    op.drop_table('movie')
    op.drop_table('genre')
    op.drop_table('director')
    op.drop_table('actor')
    # ### end Alembic commands ###
